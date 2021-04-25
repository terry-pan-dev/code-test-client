# Code Test Client

### Run App
install dependencies first
```
npm install
```

launch locally
```
npm start
```

Then all you have to do, it's sign up and login.

### Tech Stack Selection
#### material-ui
I choose material-ui as the front end UI library for several reasons. First of
all, it's one of several popular react front end UI library like Bootstrap and
Ant. Moreover, it follows the Material Design methodology. Generally say, it's
more modern and contains good graphic UI design philosophy. Last one, personally
I use it more often than other UI libraries.

#### react-redux
I choose react-redux as the state management framework is because when project
getting bigger and complex, react-redux is generally more robust to scale out.

#### redux-saga
There are different side effect libraries, one classic one is redux-thunk. Compare
to redux-thunk, redux-saga provides generator functions. It will not block when
there are multiple requests send simultaneously. What's more, using redux-saga
is generally easier to test.

#### immutable
I choose immutable library to make reducer state immutable. Therefore, whenever,
there is any state change, it will make sure it always create new state, instead
reusing the original one. Moreover, immutable libraries can make redux to track
the state more eaiser.
#### react-google-maps && use-places-autocomplete
These two libraries are used for making the map page. React-google-maps/api is
used for calling different google map related servies, like GeoCoding service,
Directions service and Places service. Whereas, use-places-autocomplete is mainly
used for achieving the autocomplete of address.
