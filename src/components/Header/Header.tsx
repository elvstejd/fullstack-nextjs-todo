import {
  Badge,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useExtendUserExpiry } from "../../hooks/useExtendUserExpiry";
import { useSignUp } from "../../hooks/useSignUp";

export function Header() {
  const { data: session, status } = useSession();
  const [authMode, setAuthMode] = useState<"Iniciar sesión" | "Registrarse">(
    "Iniciar sesión"
  );
  const [authLoading, setAuthLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { username: "", password: "" },
  });
  const { mutate: extendUserExpiry, isLoading } = useExtendUserExpiry();
  const { mutate: signUp } = useSignUp();

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (authLoading) {
      interval = setInterval(() => setAuthLoading(false), 5000);
    }
    return () => clearInterval(interval);
  }, [authLoading]);

  return (
    <>
      <Box sx={{ padding: "2rem 1rem" }}>
        <Group position="apart">
          <Badge>Todo App</Badge>
          <Group spacing="xs">
            {session ? (
              <>
                <Text>
                  Hola, {session.user?.username ?? "Usuario temporal"}
                </Text>
                {session.user?.expiresAt && (
                  <>
                    <Text>
                      <Countdown
                        onComplete={() => signOut()}
                        date={session.user.expiresAt}
                      />
                    </Text>
                  </>
                )}
                <Group spacing="xs">
                  <Button
                    size="sm"
                    compact
                    onClick={() => {
                      signOut();
                      setAuthLoading(true);
                    }}
                    loading={authLoading}
                  >
                    Cerrar sesion
                  </Button>
                  {session.user?.expiresAt && (
                    <Button
                      size="sm"
                      compact
                      variant="subtle"
                      loading={isLoading}
                      onClick={() => extendUserExpiry()}
                    >
                      Extender tiempo
                    </Button>
                  )}
                </Group>
              </>
            ) : (
              <>
                <Group spacing="xs">
                  <Button
                    compact
                    size="sm"
                    onClick={() => {
                      signIn("temp");
                      setAuthLoading(true);
                    }}
                    variant="subtle"
                    loading={authLoading}
                  >
                    Perfil de invitado
                  </Button>
                  <Button
                    size="sm"
                    compact
                    onClick={() => setShowLoginModal(true)}
                    disabled={authLoading}
                  >
                    Mi cuenta
                  </Button>
                </Group>
              </>
            )}
          </Group>
        </Group>
      </Box>
      <Modal
        title={authMode}
        opened={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <form
          onSubmit={handleSubmit((data) => {
            if (authMode === "Registrarse") {
              signUp(data);
              return;
            }
            signIn("credentials", {
              email: data.username,
              ...data,
              callbackUrl: `${window.location.origin}/`,
            });
          })}
        >
          <Stack mb={16}>
            <TextInput label="Usuario" {...register("username")} />
            <TextInput
              label="Clave"
              type="password"
              {...register("password")}
            />
            <Button loading={status === "loading"} type="submit">
              Enviar
            </Button>
          </Stack>
          <Text
            variant="link"
            sx={{ display: "inline" }}
            onClick={() =>
              setAuthMode((prev) => {
                if (prev === "Iniciar sesión") return "Registrarse";
                return "Iniciar sesión";
              })
            }
          >
            {authMode === "Iniciar sesión" ? "Registrate" : "Inicia sesion"}
          </Text>
          <Text sx={{ display: "inline" }}>
            {" "}
            si {authMode === "Registrarse" ? "ya" : "no"} tienes una cuenta.
          </Text>
        </form>
      </Modal>
    </>
  );
}
