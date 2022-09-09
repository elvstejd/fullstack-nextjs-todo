import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { BiCheckCircle, BiCircle } from "react-icons/bi";

export interface TaskProps {
  data: {
    id: string;
    title: string;
    completed: string;
  };
}

export function Task({ data: task }: TaskProps) {
  const theme = useMantineTheme();

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
      <Group position="apart">
        <Text>{task.title}</Text>
        <Box sx={{ cursor: "pointer" }}>
          {task.completed ? (
            <BiCheckCircle size={24} color={theme.colors.gray[6]} />
          ) : (
            <BiCircle size={24} color={theme.colors.gray[6]} />
          )}
        </Box>
      </Group>
    </Box>
  );
}
