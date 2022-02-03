function Table(props) { 
    return (
      <table>
        <TableHeader />
        <TableBody appointmentData = {props.appointmentData} />
      </table>
    );
 }

function TableHeader() {
    return (
      <thead>
      </thead>
    );
}

function TableBody(props) {
  const appointmentData = props.appointmentData;  
  return (
      <tbody>
        {appointmentData}
      </tbody>
    );
}

export default Table;
