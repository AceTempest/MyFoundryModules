// Get all tokens in the scene
const tokens = canvas.tokens.placeables;

// Function to toggle the state of a token and its adjacent tokens
function toggleLight(token) {
  const currentState = token.data.img;
  const nextState = currentState === "./assets/light-on.png" ? "./assets/light-off.png" : "./assets/light-on.png";
  token.update({ img: nextState });

  // Toggle the state of adjacent tokens (up, down, left, right)
  const adjacentTokens = [
    { x: token.x - 1, y: token.y },
    { x: token.x + 1, y: token.y },
    { x: token.x, y: token.y - 1 },
    { x: token.x, y: token.y + 1 },
  ];

  for (const adjToken of adjacentTokens) {
    const adjacentToken = tokens.find((t) => t.x === adjToken.x && t.y === adjToken.y);

    if (adjacentToken) {
      const adjCurrentState = adjacentToken.data.img;
      const adjNextState = adjCurrentState === "./assets/light-on.png" ? "./assets/light-off.png" : "./assets/light-on.png";
      adjacentToken.update({ img: adjNextState });
    }
  }
}

// Listen for token click events
canvas.stage.on("mousedown", (event) => {
  if (event.target?.object?.type === "Token") {
    const clickedToken = event.target.object;
    toggleLight(clickedToken);
  }
});
