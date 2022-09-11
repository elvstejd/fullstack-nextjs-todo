import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useTasksMutation } from "../../hooks/useTasksMutation";

export function TaskInput() {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const { mutate, isLoading } = useTasksMutation();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate(data, {
          onSuccess() {
            reset();
          },
        })
      )}
    >
      <Group
        spacing="sm"
        sx={(theme) => ({
          padding: ".8rem 1rem",
          borderTop: `1px solid ${theme.colors.gray[3]}}`,
        })}
      >
        <BiPlus color="gray" />
        <TextInput
          variant="unstyled"
          placeholder="Nueva tarea"
          style={{ flex: 1 }}
          {...register("title")}
          disabled={isLoading}
        />
        <Button type="submit" radius="lg" size="sm" compact loading={isLoading}>
          Agregar
        </Button>
      </Group>
    </form>
  );
}
