# Plinko challenge
A MongoDB + NodeJS + Typescript APi with a single endpoint.

## How to start the project

1. Clone the project
    ```
    git clone -b dockerized-version --single-branch https://github.com/bruno-queiroz/plinko-challenge.git
    ```
2. Create an .env file on the root of the project
3. Copy the environment variables from the .env.example file to the .env file
4. Run the project
```
sudo docker-compose up
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
