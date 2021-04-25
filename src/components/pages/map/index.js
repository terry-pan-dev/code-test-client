import React, { useState, useEffect } from 'react'
import {
    GoogleMap,
    useLoadScript,
    DirectionsService,
    DirectionsRenderer
} from '@react-google-maps/api'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import useStyles from './style'


const defaultCenter = {
    // default center set to sydney
    lat: -33.868820,
    lng: 151.209290
}

const libraries = ["places"]

export default function Map() {
    const classes = useStyles()
    // option used for google direction services
    const [option, setOption] = useState({
        travelMode: 'DRIVING',
        origin: '',
        destination: ''
    })
    const [response, setResponse] = useState(null)

    // using google map api as well as load google place api library
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // when directionsService return the response, we need update the response
    // to draw the route
    const directionsCallback = (resp, status) => {
        if (resp !== null) {
            if (status === 'OK') {
                setResponse(resp)
            }
        }
    }

    // ask client to permit the location access service
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                setOption({
                    ...option,
                    origin: `${lat},${lng}`
                })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // call direction service only when destination is not empty (initial is empty)
    const callDirectionServices = () => {
        return option.destination && (
            <DirectionsService options={{
                destination: option.destination,
                origin: option.origin || `${defaultCenter.lat},${defaultCenter.lng}`,
                travelMode: option.travelMode
            }} callback={directionsCallback}>
            </DirectionsService>
        )
    }

    // call direction render
    const callDirectionRender = () => {
        return <DirectionsRenderer
            options={{
                directions: response
            }}
        />
    }

    // update destination, when client select an address from search box
    const setDest = React.useCallback(({ lat, lng }) => {
        setOption({
            ...option,
            destination: `${lat},${lng}`
        })
        setResponse(null)
    }, [option])


    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading Maps"
    return (
        <>
            <Search setDest={setDest} />
            <GoogleMap
                mapContainerClassName={classes.map}
                zoom={8}
                center={defaultCenter}>
                {response === null && callDirectionServices()}
                {response !== null && callDirectionRender()}
            </GoogleMap>
        </>
    )
}

function Search({ setDest }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            lat: () => defaultCenter.lat,
            lng: () => defaultCenter.lng
        },
        radius: 200 * 1000
    }
    );

    const classes = useStyles()
    const handleInput = (e) => {
        setValue(e.target.value);
    };

    async function handleSelect(address) {
        setValue(address, false)
        try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            setDest({ lat, lng })
            clearSuggestions()
        } catch (error) {
        }
    }

    return (
        <div className={classes.searchRoot}>
            <Combobox onSelect={handleSelect} aria-labelledby="demo">
                <ComboboxInput
                    className={classes.search}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready} />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption
                                    key={place_id}
                                    value={description}
                                    className={classes.option} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}