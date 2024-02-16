# Plinko challenge
A MongoDB + NodeJS + Typescript APi with a single endpoint.

## How to start the project

1. Clone the project
    ```
    git clone https://github.com/bruno-queiroz/plinko-challenge.git
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Create a .env file on the root of the project
  
4. Copy the environment variable from the .env.example file to the .env file
  
5. Make sure to have MongoDB running locally
    ```
    sudo systemctl start mongod
    ```
6. Run the app
    ```
    npm run dev
    ```

## Endpoint
`GET /bet?bet=3&rows=8&risk=low`

```
curl -i -H 'Accept: application/json' http://localhost:3000/bet?bet=3&rows=8&risk=low
```

| Params        | Constraints   |
| ------------- | ------------- |
| bet           | A number value that should be greater than 1 |
| rows          | A number value that should be greater than 8 and less than 16 |
| risk          | 3 possible options: "low" \| "medium" \| "high" |

## Tests
Run tests
```
npm run test
```
