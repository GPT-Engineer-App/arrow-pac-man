import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, GridItem, Heading, useEventListener } from "@chakra-ui/react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const DIRECTIONS = [
  [-1, 0], // Up
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
];

const Index = () => {
  const [pacmanPos, setPacmanPos] = useState({ x: 1, y: 1 });
  const [direction, setDirection] = useState(1);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    // Initialize the grid
    const initialGrid = Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0));
    initialGrid[pacmanPos.x][pacmanPos.y] = 2;
    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    // Move Pac-Man automatically
    const timer = setInterval(() => {
      movePacman(direction);
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [direction]);

  const handleKeyDown = (e) => {
    // Change direction based on arrow keys
    switch (e.key) {
      case "ArrowUp":
        setDirection(0);
        break;
      case "ArrowRight":
        setDirection(1);
        break;
      case "ArrowDown":
        setDirection(2);
        break;
      case "ArrowLeft":
        setDirection(3);
        break;
      default:
        break;
    }
  };

  useEventListener("keydown", handleKeyDown);

  const movePacman = (dir) => {
    const newPos = {
      x: pacmanPos.x + DIRECTIONS[dir][0],
      y: pacmanPos.y + DIRECTIONS[dir][1],
    };

    if (newPos.x >= 0 && newPos.x < GRID_SIZE && newPos.y >= 0 && newPos.y < GRID_SIZE) {
      if (grid[newPos.x][newPos.y] === 0) {
        setScore((prevScore) => prevScore + 1);
      }
      const newGrid = [...grid];
      newGrid[pacmanPos.x][pacmanPos.y] = 0;
      newGrid[newPos.x][newPos.y] = 2;
      setGrid(newGrid);
      setPacmanPos(newPos);
    }
  };

  return (
    <Box textAlign="center" ref={gridRef}>
      <Heading as="h1" size="xl" mb={8}>
        Pac-Man
      </Heading>
      <Heading as="h2" size="lg" mb={4}>
        Score: {score}
      </Heading>
      <Grid templateColumns={`repeat(${GRID_SIZE}, ${CELL_SIZE}px)`} gap={0} justifyContent="center">
        {grid.map((row, rowIndex) => row.map((cell, colIndex) => <GridItem key={`${rowIndex}-${colIndex}`} w={CELL_SIZE} h={CELL_SIZE} bg={cell === 0 ? "gray.100" : cell === 2 ? "yellow.400" : "white"} border="1px" borderColor="gray.200" />))}
      </Grid>
    </Box>
  );
};

export default Index;
