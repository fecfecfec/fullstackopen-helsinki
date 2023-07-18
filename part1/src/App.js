// const Header = (props) => {
//   return (
//     <>
//       <h1>{props.course}</h1>
//     </>
//   )
// }


// const Content = (props) => {
//   return (
//     <>
//       <p>
//         {props.part} {props.exercises}
//       </p>
//     </>
//   )
// }

// const Total = (props) => {
//   return (
//     <>
//       <p>Number of exercises {props.value}</p>
//     </>
//   )
// }

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   return (
//     <div>
//       <Header course={course} />
//       <Content part={[part1]} exercises={[exercises1]} />
//       <Content part={[part2]} exercises={[exercises2]} />
//       <Content part={[part3]} exercises={[exercises3]} />
//       <Total value={exercises1 + exercises2 + exercises3}/>
//     </div>
//   )
// }

const Hello = ({ name, age }) => {
  // const { name, age } = props
  // Equals
  // const name = props.name
  // const age = props.age

  const bornYear = () => new Date().getFullYear() - age
  // Equals
  // const bornYear = () => {
  //   return new Date().getFullYear() - age
  // }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App