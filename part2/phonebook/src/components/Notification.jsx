// src/components/Notification.jsx

const Notification = ({ notification }) => {
  // If notification message is null, render nothing
  if (notification.message === null) {
    return null
  }

  // Define styles based on notification type
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification