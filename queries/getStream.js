import { gql } from "@apollo/client";

const GET_STREAM_DETAILS = gql`
  query Event($sender: String, $receiver: String) {
    streams(where: { sender: $sender, receiver: $receiver }) {
      id
      currentFlowRate
      createdAtTimestamp
      updatedAtTimestamp
      token {
        id
        name
        symbol
      }
      streamPeriods {
        id
      }
    }
  }
`;

export { GET_STREAM_DETAILS };

// timestap1 - timestam2;

// case 1

//  {
//     type:0
// timestam:2982929292,
//  }
//  {
//     type:2
// timestam:2982929292,
//  }

// in this case we will calcule time between type 0 and type 2

// case 2

// {
//     type:0  open the stream
// }

// if doesn't exsist type 2 then it's mean the streaming is not stopped

// in this case  we need to calculte type0 timestamp and our current time

// ********************** updated flow **********************

// case 1

// if we are getting the data and the currentFlowRate is > 0 then what happen ?

// it mean active stream

// currentTime - createdAtTimestamp

// case 2

// if we are getting the data and the currentFlowRate is = 0 then what happen ?

// in this case we will show the text no active stream with this account

// case 3

// if we are getting more than one stream like three  what happend

// 28822828  - currerntTIme
// 82828282
// 8282828

// current monthly amount

// =38580246913580/(10^18)*60*60*24*30

// case 4

// if we  will get stream and currentFlowRate > 0 and other streams is = 0 then what happen ?
