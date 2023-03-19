import type { NextPage } from 'next'
import Layout from 'src/components/layout'
import Main from 'src/components/main/main'
import styles from './index.module.css'
import Curt from 'src/components/svg/curt'
import Logo from 'src/components/svg/logo'
import { useState } from 'react'
import Product from 'src/components/product/product'
import Aboutme from 'src/components/aboutme/aboutme'
import Interesting from 'src/components/interesting/interesting'
import Contact from 'src/components/contact/contact'
import Login from 'src/components/login/login'
import { useTransition } from 'react-spring'
import Back from 'src/components/login/back'
import Log from 'src/components/svg/log'
import Portal from 'src/components/portal'
import CurtBlock from 'src/components/curt/curt'
import { useAppContext } from 'src/components/state'
import { observer } from 'mobx-react-lite'
import { UserProfile } from 'src/components/svg/user'
import jwt_decode from "jwt-decode";
import HamburgerSVG from 'src/components/svg/hamburgerSVG'
import DropDown from 'src/components/dropdown/dropdown'

const Home: NextPage = observer(() => {
  const [element, setElement] = useState<number>(0);
  const [loginOut, setLoginOut] = useState(false)
  const [curt, setCurt] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const { user } = useAppContext()
  let token: any;
  var decoded: any;
  if (typeof window !== "undefined") {
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token')
      decoded = jwt_decode(token);
    }
  }
  const loginAnimate = useTransition(loginOut, {
    from: {
      x: 200,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x: 200,
      opacity: 0,
    },
  })
  const dropDownAnimated = useTransition(dropDown, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  })
  const curtAnimate = useTransition(curt, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  })
  return (
    <Layout>
      <Portal selector="#modal">
        {loginAnimate((style, loginOut) =>
          loginOut && <Login open={loginOut} style={style} onToggle={setLoginOut} />
        )}
      </Portal>
      <Portal selector="#modal">
        {curtAnimate((style, curt) =>
          curt && <CurtBlock open={curt} style={style} onToggle={setCurt} />
        )}
      </Portal>
      {loginOut && (
        <Portal selector="#modal">
          <Back />
        </Portal>
      ) || curt && (
        <Portal selector="#modal">
          <Back />
        </Portal>
      )}
      <div className={styles.header}>
        <Logo />
        <ul className={styles.disable}>
          <li onClick={() => setElement(0)} style={element === 0 ? { color: "white" } : undefined}>Главная</li>
          <li onClick={() => setElement(1)} style={element === 1 ? { color: "white" } : undefined}>Каталог</li>
          <li onClick={() => setElement(2)} style={element === 2 ? { color: "white" } : undefined}>О нас</li>
          {/* <li onClick={() =>  setElement(3)} style={element===3 ?{color: "white"}:undefined}>Интересное</li> */}
          <li onClick={() => setElement(4)} style={element === 4 ? { color: "white" } : undefined}>Контакты</li>
          <HamburgerSVG open={dropDown} onToggle={setDropDown} />
          {dropDownAnimated((style, dropDown) =>
            dropDown && <DropDown style={style} element={element} setElement={setElement} open={dropDown} onToggle={setDropDown} />
          )}
        </ul>
        <ul>
          {user.isAuth ? (
            <UserProfile image={decoded.image} />
          ) : (
            <Log setLoginOut={setLoginOut} />
          )}
          <Curt active={setCurt} />
        </ul>
      </div>
      {element === 0 && <Main />}
      {element === 1 && <Product />}
      {element === 2 && <Aboutme />}
      {element === 3 && <Interesting />}
      {element === 4 && <Contact />}
    </Layout>
  )
})

export default Home
