import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Menu,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BiCheckCircle,
  BiCircle,
  BiDotsVerticalRounded,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import { useTaskDelete } from "../../hooks/useTaskDelete";
import { useTaskMutation } from "../../hooks/useTaskMutation";

export interface TaskProps {
  index: number;
  data: {
    id: string;
    title: string;
    completed: boolean;
  };
}

export function Task({ data: task, index }: TaskProps) {
  const theme = useMantineTheme();
  const { mutate, isLoading } = useTaskMutation();
  const [done, setDone] = useState(task.completed);
  const { mutate: remove } = useTaskDelete();
  const [showEditModal, setShowEditModal] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: task.title,
    },
  });

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: ".8rem 1rem",
          borderTop: index && `1px solid ${theme.colors.gray[3]}}`,
        })}
        key={task.id}
      >
        <Group position="apart" align="center">
          <Group spacing="xs">
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                mutate({ id: task.id, completed: !task.completed });
                setDone((prev) => !prev);
              }}
            >
              <Center>
                {done ? (
                  <BiCheckCircle size={24} color={theme.colors.gray[6]} />
                ) : (
                  <BiCircle size={24} color={theme.colors.gray[6]} />
                )}
              </Center>
            </Box>
            <Text weight={600} color={done ? "gray.5" : "gray.8"}>
              {task.title}
            </Text>
          </Group>
          <Menu>
            <Menu.Target>
              <ActionIcon>
                <BiDotsVerticalRounded />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<BiEdit />}
                onClick={() => setShowEditModal(true)}
              >
                Editar
              </Menu.Item>
              <Menu.Item
                icon={<BiTrash />}
                color="red"
                onClick={() => remove({ id: task.id })}
              >
                Eliminar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>
      <Modal
        centered
        title="Editar tarea"
        opened={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <form
          onSubmit={handleSubmit((data) =>
            mutate(
              { id: task.id, title: data.title },
              {
                onSuccess() {
                  setShowEditModal(false);
                },
              }
            )
          )}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => <TextInput {...field} />}
          />

          <Button
            loading={isLoading}
            style={{ float: "right" }}
            mt={16}
            type="submit"
          >
            Editar
          </Button>
        </form>
      </Modal>
    </>
  );
}
