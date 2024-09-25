# Fivem-Monitor Package Documentation

## Overview
The `fivem-monitor` package is a simple utility for querying server information and player data from a FiveM server using its public `info.json` and `players.json` endpoints. It includes retry logic to handle rate-limiting errors (HTTP 429) by retrying the request after a specified delay.

### Prerequisites
Before using this package, ensure you have the following installed:
- Node.js
- Axios (used for making HTTP requests)

To install Axios, run the following command in your project directory:

```bash
npm install axios
```

### Installation
To install the `FivemQuery` package, simply clone or add the file containing the provided functions to your project. Then, require it in your script:

```javascript
const { FivemQuery } = require('fivem-monitor');
```

### Functions

#### `getServerInfo(serverIP, serverPort, retries = 3, delay = 5000)`
Fetches the server information from the `/info.json` endpoint.

- **Parameters**:
  - `serverIP` (String): The IP address of the FiveM server.
  - `serverPort` (Number): The port of the FiveM server.
  - `retries` (Number, Optional): Number of retry attempts if the request fails due to rate limiting (default is 3).
  - `delay` (Number, Optional): Delay in milliseconds between retry attempts (default is 5000ms).

- **Returns**: 
  - On success, returns the JSON data containing server information.
  - On failure, throws an error.

#### `getServerPlayer(ip, port, retries = 3, delay = 5000)`
Fetches the current player data from the `/players.json` endpoint.

- **Parameters**:
  - `ip` (String): The IP address of the FiveM server.
  - `port` (Number): The port of the FiveM server.
  - `retries` (Number, Optional): Number of retry attempts if the request fails due to rate limiting (default is 3).
  - `delay` (Number, Optional): Delay in milliseconds between retry attempts (default is 5000ms).

- **Returns**: 
  - On success, returns the JSON data containing player information.
  - On failure, throws an error.

#### `FivemQuery(ip, port)`
Fetches both the server information and player data and returns them as a combined object.

- **Parameters**:
  - `ip` (String): The IP address of the FiveM server.
  - `port` (Number): The port of the FiveM server.

- **Returns**:
  - On success, returns an object with two properties:
    - `server`: The server information from `info.json`.
    - `players`: The player data from `players.json`.
  - On failure, logs the error to the console.

### Usage

To use the `FivemQuery` function, you can simply call it with the server's IP and port:

```javascript
const { FivemQuery } = require('./path-to-file');

// Example usage
const ip = '127.0.0.1';
const port = 30120;

FivemQuery(ip, port)
  .then(data => {
    console.log('Server Info:', data.server);
    console.log('Player Info:', data.players);
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
```

### Error Handling
The functions include built-in error handling and retries for cases where the server responds with a 429 (Too Many Requests) error. The number of retry attempts and delay between attempts can be configured using the optional parameters `retries` and `delay`.

If the function fails to fetch the data after all retry attempts, it will throw an error, which should be caught and handled appropriately.

### License
This package is free to use and modify.
