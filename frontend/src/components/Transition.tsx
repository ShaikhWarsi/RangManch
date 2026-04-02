import Flag1 from "../assets/Transition/Layer0.png";
import Flag2 from "../assets/Transition/Layer1.png";
import Flag3 from "../assets/Transition/Layer2.png";

export function OutroTransition(): React.ReactElement {
  return (
    <div
    className="mainTransition"
      style={{
        position: "absolute" as const,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        zIndex: 5,
      }}
    >
      <img
        className={"flag flag-1"}
        src={Flag1.src}
        width={"75%"}
        style={{
          position: "absolute" as const,
          top: 0,
          right: 0,
          alignSelf: "end" as const,
        }}
      />

      <img
        className={"flag flag-2"}
        src={Flag2.src}
        width={"72%"}
        style={{
          position: "absolute" as const,
          top: "0px",
          left: "0%",
          alignSelf: "end" as const,
        }}
      />
      <img
        className={"flag flag-3"}
        src={Flag3.src}
        width={"100%"}
        style={{
          position: "absolute" as const,
          right: "0%",
          bottom: "-2%",
          alignSelf: "end" as const,
        }}
      />
    </div>
  );
}
