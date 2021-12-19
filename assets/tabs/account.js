import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function AccountIcon(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <G data-name="\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C 4">
        <G data-name="\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C 2">
          <Path
            data-name="\u041A\u043E\u043D\u0442\u0443\u0440 2"
            d="M12 11.334a5.667 5.667 0 115.667-5.667A5.673 5.673 0 0112 11.334zm0-9.336a3.669 3.669 0 103.669 3.669A3.673 3.673 0 0012 2z"
            fill="#efefef"
          />
        </G>
        <G data-name="\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C 3">
          <Path
            data-name="\u041A\u043E\u043D\u0442\u0443\u0440 3"
            d="M23 24H1a1 1 0 01-1-1 12.067 12.067 0 013.58-8.62 8.213 8.213 0 015.76-2.327h5.32a8.2 8.2 0 015.76 2.327A12.067 12.067 0 0124 23a1 1 0 01-1 1zM2.047 22h19.906a10.04 10.04 0 00-2.944-6.2 6.207 6.207 0 00-4.349-1.746H9.34a6.2 6.2 0 00-4.349 1.744 10.04 10.04 0 00-2.944 6.2z"
            fill="#efefef"
          />
        </G>
      </G>
    </Svg>
  )
}

export default AccountIcon
