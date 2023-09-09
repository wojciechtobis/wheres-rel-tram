import React from 'react'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import './TramTimeline.css'

function TramTimeline({timeline}) {
    return (
        <div className='timeline'>
        <Timeline>
          {(timeline ?? []).map((row, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="textSecondary">
                  {row.time}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{row.stop}</TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
      </div>
    );
}

export default TramTimeline