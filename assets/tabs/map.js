import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MapIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={29.419}
      height={23.611}
      {...props}
    >
      <Path
        d="M29.019.169a.938.938 0 00-.859-.111L19.3 3.312 10.442.059a.938.938 0 00-.646 0L.614 3.431a.937.937 0 00-.614.88v18.363a.937.937 0 001.26.88l8.858-3.255 8.859 3.255a.938.938 0 00.646 0l9.182-3.373a.937.937 0 00.614-.88V.937a.937.937 0 00-.4-.768zM11.056 2.28l7.307 2.685v16.366l-7.307-2.685zM1.874 4.965L9.181 2.28v16.367l-7.307 2.684zm25.671 13.682l-7.308 2.685V4.965l7.308-2.685z"
        fill="#efefef"
      />
    </Svg>
  )
}

export default MapIcon
