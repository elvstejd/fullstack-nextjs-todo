import { Alert, Box, Paper } from "@mantine/core";
import type { NextPage } from "next";
import { useTasksQuery } from "../hooks/useTasksQuery";
import { Task } from "../components/Task";
import { TaskInput } from "../components/TaskInput";
import { Header } from "../components/Header";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: tasks } = useTasksQuery();
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <Box>
        <Box
          sx={{
            maxWidth: "50rem",
            margin: "0 auto",
            marginTop: "3rem",
            marginBottom: "4.5rem",
          }}
        >
          {!session && (
            <Alert color="yellow" mb={16}>
              Necesitarás una cuenta para crear tareas. Puedes continuar creando
              un perfil temporal o bien creando una cuenta de usuario.
            </Alert>
          )}

          <Paper withBorder shadow="xs">
            {tasks.map((task, index) => (
              <Task index={index} key={task.id} data={task} />
            ))}
            <TaskInput />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Home;
