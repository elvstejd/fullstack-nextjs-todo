import { ActionIcon, Badge, Box, Group, Popover } from "@mantine/core";
import { useSession } from "next-auth/react";
import Countdown from "react-countdown";
import { showNotification } from "@mantine/notifications";
import { AiOutlineExclamation, AiOutlineMenu } from "react-icons/ai";
import dayjs from "dayjs";
import { AuthActions } from "../AuthActions";

export function Header() {
  const { data: session } = useSession();

  return (
    <>
      <Box sx={{ padding: "2rem 1rem" }}>
        <Group position="apart">
          <Badge>Todo App</Badge>
          <Box
            sx={{
              "@media only screen and (max-width: 600px)": {
                display: "none",
              },
            }}
          >
            <AuthActions />
          </Box>
          <Box
            sx={{
              "@media only screen and (min-width: 600px)": {
                display: "none",
              },
            }}
          >
            <Popover>
              <Popover.Target>
                <ActionIcon size={"lg"}>
                  <AiOutlineMenu size={20} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <AuthActions />
              </Popover.Dropdown>
            </Popover>
          </Box>
        </Group>
      </Box>

      <div hidden>
        <Countdown
          onComplete={() =>
            showNotification({
              icon: <AiOutlineExclamation />,
              autoClose: false,
              title: "Advertencia",
              color: "orange",
              message:
                'El perfil actual será eliminado en 5 minutos. Para extender tu sesión haz clic en "Extender tiempo".',
            })
          }
          date={dayjs(session?.user?.expiresAt).subtract(5, "minutes").toDate()}
        />
      </div>
    </>
  );
}
