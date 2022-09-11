import { Box, Paper } from "@mantine/core";
import type { NextPage } from "next";
import { useTasksQuery } from "../hooks/useTasksQuery";
import { Task } from "../components/Task";
import { TaskInput } from "../components/TaskInput";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  const { data: tasks } = useTasksQuery();

  return (
    <>
      <Header />
      <Box>
        <Box
          sx={{
            maxWidth: "30rem",
            margin: "0 auto",
            marginTop: "3rem",
            marginBottom: "4.5rem",
          }}
        >
          <Paper>
            {tasks.map((task) => (
              <Task key={task.id} data={task} />
            ))}
          </Paper>
        </Box>
        <TaskInput />
      </Box>
    </>
  );
};

export default Home;
