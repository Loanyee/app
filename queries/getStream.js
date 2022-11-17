import { gql } from "@apollo/client";

const GET_STREAM_DETAILS = gql`
  query Event($sender: String, $receiver: String) {
    streams(where: { sender: $sender, receiver: $receiver }) {
      id
      currentFlowRate
      createdAtTimestamp
      updatedAtTimestamp
      streamedUntilUpdatedAt
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
