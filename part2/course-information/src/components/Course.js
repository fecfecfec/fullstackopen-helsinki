// const Header = (props) => {
//     console.log('Header props', props)
//     return (
//         <>
//             <h1>{props}</h1>
//         </>
//     )
// }

// const Part = (props) => {
//     return (
//         <>
//             <p>
//                 {props.part.name} {props.part.exercises}
//             </p>
//         </>
//     )
// }

// const Content = (props) => {
//     return (
//         <>
//             <Part part={props.parts[0]} />
//             <Part part={props.parts[1]} />
//             <Part part={props.parts[2]} />
//         </>
//     )
// }

// const Total = (props) => {
//     // const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises => Verbose
//     const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
//     console.log(total)
//     return (
//         <>
//             <p>Number of exercises {total}</p>
//         </>
//     )
// }

// const Course = (props) => {
//     console.log('Course props', props)
//     return (
//         <> 
//             {/* <Header name={props.name} /> */}
//             {/* <Content parts={props.parts} />
//             <Total parts={props.parts} /> */}
//         </>
//     )
// }

// export default Course