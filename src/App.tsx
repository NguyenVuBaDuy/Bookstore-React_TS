import { useDispatch } from "react-redux"
import { useAppSelector } from './redux/hooks'
import { decrement, increment } from "./redux/counter/counterSlice"
const App = () => {

  const dispatch = useDispatch()

  const value: number = useAppSelector(state => state.counter.value)

  return (
    <>
      <div>
        <span style={{ padding: "20px", backgroundColor: "red", cursor: "pointer" }}
          onClick={() => { dispatch(decrement()) }}
        >minus</span>
        <span style={{ padding: "20px", backgroundColor: "blue" }}>{value}</span>
        <span style={{ padding: "20px", backgroundColor: "green", cursor: "pointer" }}
          onClick={() => { dispatch(increment()) }}>plus</span>
      </div>
    </>
  )
}

export default App