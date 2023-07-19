// Changed props and props.name to the destructured version
// Shorten component for further readability
const Header = ({ name }) => (
    <>
        <h1>{name}</h1>
    </>
)

const Part = (props) => {
    return (
        <>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </>
    )
}

const Content = (props) => {
    const mappedParts = props.parts.map((part) => {
        return (
            <Part key={part.id} part={part} />
        )
    })

    return (
        <>
            {mappedParts}
        </>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
            <p><strong>Number of exercises: {total}</strong></p>
        </>
    )
}

const Course = (props) => {
    const mappedCourses = props.course.map((course) => {
        return (
            <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
                <hr></hr>
            </div>
        )
    })

    return (
        <>
            {mappedCourses}
        </>
    )
}

export default Course