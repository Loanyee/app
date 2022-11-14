import { gql } from "@apollo/client";

const GET_STREAM_DETAILS = gql`
  query Event($sender: String, $receiver: String) {
    flowUpdatedEvents(where: { sender: $sender, receiver: $receiver }) {
      id
      gasPrice
      timestamp
      type
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
