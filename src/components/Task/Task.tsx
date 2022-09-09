import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { BiCheckCircle, BiCircle } from "react-icons/bi";
import { useTaskMutation } from "../../hooks/useTaskMutation";

export interface TaskProps {
  data: {
    id: string;
    title: string;
    completed: boolean;
  };
}

export function Task({ data: task }: TaskProps) {
  const theme = useMantineTheme();
  const { mutate } = useTaskMutation();
  const [done, setDone] = useState(task.completed);

  return (
    <Box
      sx={(theme) => ({
        background: theme.colors.gray[1],
        borderRadius: theme.radius.md,
        padding: "1rem",
        marginBottom: ".5rem",
      })}
      key={task.id}
    >
      <Group position="apart" align="center">
        <Text>{task.title}</Text>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => {
            mutate({ id: task.id, completed: !task.completed });
            setDone((prev) => !prev);
          }}
        >
          {done ? (
            <BiCheckCircle size={24} color={theme.colors.gray[6]} />
          ) : (
            <BiCircle size={24} color={theme.colors.gray[6]} />
          )}
        </Box>
      </Group>
    </Box>
  );
}
