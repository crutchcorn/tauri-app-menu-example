import {Menu, Submenu} from '@tauri-apps/api/menu'
import {useEffect, useState} from "react";

const macOS = navigator.userAgent.includes('Macintosh')

interface MenuActions {
  addOne: () => void;
}

async function create({
                        addOne
                      }: MenuActions) {
  const submenu = await Submenu.new({
    text: 'Nothing',
    items: [
      {
        text: 'Do nothing',
        enabled: false
      }
    ]
  })

  const submenu2 = await Submenu.new({
    text: "Real Actions",
    items: [
      {
        text: "Add one",
        enabled: !!addOne,
        action: addOne
      },
      {
        text: "Alert",
        enabled: true,
        action: () => {
          alert("Test")
        }
      }
    ]
  });

  const menu = await Menu.new({
    items: [submenu, submenu2]
  })
  await (macOS ? menu.setAsAppMenu() : menu.setAsWindowMenu())
}

function App() {
  const [val, setVal] = useState(0)
  useEffect(() => {
    create({
      addOne: () => {
        setVal(v => v + 1)
      }
    });
  }, [])

  return <div>
    <p>Test {val}</p>
  </div>
}

export default App;
