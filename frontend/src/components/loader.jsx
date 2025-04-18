import { Card, Spin } from "antd";

export function Loader() {
  return (
    <div
    id="loader"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        display: "none",
        backdropFilter:"blur(5px)",
        zIndex:3,
        backgroundColor:"rgba(0, 89, 255, 0.24)"
      }}
    >
      <div style={{ margin: "auto" }}>
        <Card>
          <Spin tip="Loading" spinning size="large" ><div style={{height:50, width:50}}></div></Spin>
        </Card>
      </div>
    </div>
  );
}

export class Loading{
    static showLoader(){
        document.getElementById("loader").style.display= "flex"
    }
    static hideLoader(){
        document.getElementById("loader").style.display= "none"
    }
}