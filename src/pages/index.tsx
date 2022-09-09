import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTasksMutation } from "../hooks/useTasksMutation";
import { useTasksQuery } from "../hooks/useTasksQuery";

const Home: NextPage = () => {
  // const { data: session } = useSession();
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
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <input {...register("title")} />
      </form>
    </>
  );
};

export default Home;
