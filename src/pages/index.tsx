import { Box, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasksMutation } from "../hooks/useTasksMutation";
import { useTasksQuery } from "../hooks/useTasksQuery";
import { Task } from "../components/Task";

const Home: NextPage = () => {
  const { mutate, isSuccess } = useTasksMutation();
  const { data: tasks } = useTasksQuery();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  return (
    <>
      <Box sx={{ maxWidth: "30rem", margin: "0 auto", marginTop: "3rem" }}>
        <Title mb={16}>My Todos</Title>
        {tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <input {...register("title")} />
        </form>
      </Box>
    </>
  );
};

export default Home;
