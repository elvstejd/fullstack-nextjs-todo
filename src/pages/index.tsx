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
            padding: "1rem",
          }}
        >
          {!session && (
            <Alert color="yellow" mb={16}>
              Necesitarás una cuenta para crear tareas. Puedes continuar creando
              un perfil temporal o bien creando una cuenta de usuario.
            </Alert>
          )}

          <Paper shadow="xs">
            <TaskInput />
          </Paper>
          <Box
            sx={{
              marginTop: "1rem",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1rem",
              "@media only screen and (min-width: 600px)": {
                gridTemplateColumns: "1fr 1fr",
              },
            }}
          >
            {tasks.map(
              (task: { id: string; title: string; completed: boolean }) => (
                <Paper key={task.id} withBorder>
                  <Task data={task} />
                </Paper>
              )
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
