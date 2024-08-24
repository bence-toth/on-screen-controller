import { useCallback, useEffect, useState } from "react";

import "./App.css";

interface GamepadKeyMap {
  left: {
    trigger: {
      primary: number;
      secondary: number;
    };
    stick: {
      button: number;
      horizontal: number;
      vertical: number;
    };
    direction: {
      up: number;
      down: number;
      left: number;
      right: number;
    };
  };
  right: {
    trigger: {
      primary: number;
      secondary: number;
    };
    action: {
      x: number;
      y: number;
      a: number;
      b: number;
    };
    stick: {
      button: number;
      horizontal: number;
      vertical: number;
    };
  };
}

const App = () => {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null);
  const [gamepadKeys, setGamepadKeys] = useState<GamepadKeyMap | null>(null);

  const gamepadConnectedHandler = useCallback(
    (gamepadConnectedEvent: GamepadEvent) => {
      console.log("Gamepad connected", gamepadConnectedEvent.gamepad);
      setGamepadIndex(gamepadConnectedEvent.gamepad.index);
    },
    []
  );

  const controllerLoop = useCallback(() => {
    if (gamepadIndex === null) {
      return;
    }
    const gamepad = navigator.getGamepads()[gamepadIndex] as Gamepad;

    if (!gamepad) {
      setGamepadKeys(null);
    } else {
      setGamepadKeys({
        left: {
          trigger: {
            primary: gamepad.buttons[6].value,
            secondary: gamepad.buttons[4].value,
          },
          stick: {
            button: gamepad.buttons[10].value,
            horizontal: gamepad.axes[0],
            vertical: gamepad.axes[1],
          },
          direction: {
            up: gamepad.buttons[12].value,
            down: gamepad.buttons[13].value,
            left: gamepad.buttons[14].value,
            right: gamepad.buttons[15].value,
          },
        },
        right: {
          trigger: {
            primary: gamepad.buttons[7].value,
            secondary: gamepad.buttons[5].value,
          },
          action: {
            x: gamepad.buttons[2].value,
            y: gamepad.buttons[3].value,
            a: gamepad.buttons[0].value,
            b: gamepad.buttons[1].value,
          },
          stick: {
            button: gamepad.buttons[11].value,
            horizontal: gamepad.axes[2],
            vertical: gamepad.axes[3],
          },
        },
      });
    }
    requestAnimationFrame(controllerLoop);
  }, [gamepadIndex]);

  useEffect(() => {
    window.addEventListener("gamepadconnected", gamepadConnectedHandler);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnectedHandler);
    };
  }, [gamepadConnectedHandler]);

  useEffect(() => {
    requestAnimationFrame(controllerLoop);
  }, [controllerLoop]);

  return (
    <div className="app">
      <div className="controller">
        <div className="left-hand">
          <div className="trigger-wrapper">
            <div className="trigger">
              <div
                className="secondary"
                data-pressed={gamepadKeys?.left.trigger.secondary === 1}
              ></div>
              <div
                className="primary"
                style={
                  {
                    "--pressure": gamepadKeys?.left.trigger.primary ?? 0,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          </div>
          <div className="stick-wrapper">
            <div className="stick">
              <div
                className="position"
                data-pressed={gamepadKeys?.left.stick.button === 1}
                style={
                  {
                    "--horizontal": gamepadKeys?.left.stick.horizontal ?? 0,
                    "--vertical": gamepadKeys?.left.stick.vertical ?? 0,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          </div>
          <div className="direction-buttons-wrapper">
            <div className="direction-buttons">
              <div
                className="button up"
                data-pressed={gamepadKeys?.left.direction.up === 1}
              ></div>
              <div
                className="button down"
                data-pressed={gamepadKeys?.left.direction.down === 1}
              ></div>
              <div
                className="button right"
                data-pressed={gamepadKeys?.left.direction.right === 1}
              ></div>
              <div
                className="button left"
                data-pressed={gamepadKeys?.left.direction.left === 1}
              ></div>
            </div>
          </div>
        </div>
        <div className="right-hand">
          <div className="trigger-wrapper">
            <div className="trigger">
              <div
                className="secondary"
                data-pressed={gamepadKeys?.right.trigger.secondary === 1}
              ></div>
              <div
                className="primary"
                style={
                  {
                    "--pressure": gamepadKeys?.right.trigger.primary ?? 0,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          </div>
          <div className="action-buttons-wrapper">
            <div className="action-buttons">
              <div
                className="button x"
                data-pressed={gamepadKeys?.right.action.x === 1}
              ></div>
              <div
                className="button y"
                data-pressed={gamepadKeys?.right.action.y === 1}
              ></div>
              <div
                className="button a"
                data-pressed={gamepadKeys?.right.action.a === 1}
              ></div>
              <div
                className="button b"
                data-pressed={gamepadKeys?.right.action.b === 1}
              ></div>
            </div>
          </div>
          <div className="stick-wrapper">
            <div className="stick">
              <div
                className="position"
                data-pressed={gamepadKeys?.right.stick.button === 1}
                style={
                  {
                    "--horizontal": gamepadKeys?.right.stick.horizontal ?? 0,
                    "--vertical": gamepadKeys?.right.stick.vertical ?? 0,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
