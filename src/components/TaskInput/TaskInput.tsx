import { Affix, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useTasksMutation } from "../../hooks/useTasksMutation";

export function TaskInput() {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const { mutate, isLoading } = useTasksMutation();

  return (
    <Affix position={{ bottom: 16, left: 0, right: 0 }}>
      <form
        onSubmit={handleSubmit((data) =>
          mutate(data, {
            onSuccess() {
              reset();
            },
          })
        )}
      >
        <Group sx={{ maxWidth: "30rem", margin: "0 auto" }} spacing="sm">
          <TextInput
            placeholder="I want to..."
            style={{ flex: 1 }}
            radius="lg"
            size="md"
            {...register("title")}
          />
          <Button radius="lg" size="md" loading={isLoading}>
            Add
          </Button>
        </Group>
      </form>
    </Affix>
  );
}
