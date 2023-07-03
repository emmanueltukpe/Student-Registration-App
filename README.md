# The Predict League 

## About
The Predict League is a game that allows players to predict the outcomes of a match in their favourite football leagues and be ranked. They are allowed to create their personal leagues with their peers and each match day, they get to make predictions and be ranked based on the accuracy of their predictions.

### Ranking system

5 points - Exact Score prediction
3 points - Predicting the right team team to win or both teams draw
-1 points - Having a completely wrong prediction

## ER Diagram

![Entity-Relationship Diagram][def]

[def]: ./img/er.diagram.png

# Installation

1. Install yarn

```sh
$ npm install --global yarn
```

2. Install the dependencies

```sh
$ yarn
```

3. Install Typescript

```sh
$ npm install --global typescript
```

4. Start Typescript Compiler

```sh
$ tsc -w -p ./tsconfig.json
```

5. Open another shell and start the server
```sh
$ yarn start:dev
```
