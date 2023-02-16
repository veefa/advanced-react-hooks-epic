import * as React from 'react'

function ConsoleGreeting(props) {
    const greet = React.useCallback(
      greeting => console.log(`${greeting} ${props.name}`),
      [props.name],
    )
  
    React.useEffect(() => {
      const helloGreeting = 'Hello'
      greet(helloGreeting)
    }, [greet])
    return <div>check the console</div>
  }
  ConsoleGreeting()