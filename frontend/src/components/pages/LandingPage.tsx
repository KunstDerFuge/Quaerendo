import * as React from 'react'
import { Button, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RegistrationPage from './RegistrationPage'

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes slide': {
    '0%': {
      'background-position-y': '35%'
    },
    '100%': {
      'background-position-y': '535%'
    }
  },
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
    color: '#ddd'
  },
  hero: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'end',
    background: 'url("/static/frontend/misinfo_blurred-min.png") repeat-y',
    backgroundSize: '100%',
    width: '100%',
    justifyContent: 'center',
    animation: '$slide 600s linear infinite',
    boxShadow: 'inset 0px -20vh 60px 0px #202020'
  },
  headline: {
    fontSize: '2rem'
  },
  empty: {
    height: '20vh',
    display: 'flex',
    alignItems: 'center'
  },
  textContainer: {
    marginLeft: '1em',
    marginRight: '1em'
  },
  fullWidth: {
    width: '100%'
  },
  secondaryText: {
    color: '#ccc',
    fontSize: '1.2rem',
    fontFamily: 'gill-sans-roman'
  },
  roundedImage: {
    borderRadius: '12px',
    marginTop: '2em',
    marginBottom: '4em',
    width: '100%'
  },
  spacer: {
    height: '8em'
  },
  smallSpacer: {
    height: '4em'
  },
  whiteText: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '10px'
  }
}))

const LandingPage: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item className={classes.hero}>
        <div className={classes.textContainer}>
          <Typography variant='h1' className={classes.headline}>
            Fake news and misinformation run rampant on social media.
          </Typography>
          <Typography variant='h2'>
            You can help stop it.
          </Typography>
        </div>
      </Grid>
      <Grid item alignItems='center' className={classes.empty}>
        <Typography variant='h1'>⌄</Typography>
      </Grid>
      <div className={classes.spacer} />
      <Grid item container justify='space-around' direction='row' className={classes.fullWidth}>
        <Grid item md={5} xs={10}>
          <Typography variant='h2' gutterBottom>
            Not like the other fact checkers.
          </Typography>
          <Typography variant='body1' className={classes.secondaryText}>
            We don't tell you what to think. We show you the best evidence for both sides of the argument. Users are in
            complete control of submitting and reviewing claims and evidence.
          </Typography>
          <img src='/static/frontend/example.png' className={classes.roundedImage} />
        </Grid>
        <Grid item md={5} xs={10}>
          <Typography variant='h2' gutterBottom align='center'>
            Participate in the review process ― no expertise needed.
          </Typography>
          <Typography variant='body1' align='center' className={classes.secondaryText}>
            Join our effort to elevate online discourse. Make your voice heard.
          </Typography>
          <RegistrationPage />
        </Grid>
      </Grid>
      <div className={classes.spacer} />
      <Grid item container justify='space-around' direction='row' className={classes.fullWidth}>
        <Grid item xs={10} md={6}>
          <Typography variant='h1' gutterBottom>
            Why Quærendo?
          </Typography>
          <Typography className={classes.secondaryText} gutterBottom>
            The name "Quærendo" comes from the latin phrase <i>"Quærendo Invenietis"</i> meaning "You'll find it if you
            look for it". In the spirit of exploration and discovery, we want to empower people to think critically
            about the claims they see online, and give them the tools for better discourse.
          </Typography>
          <Typography className={classes.secondaryText} gutterBottom>
            On May 4, 2020, during the height of the initial wave of the COVID-19 pandemic in the United States, a video
            called "Plandemic" was released online. Full of false claims and disinformation, it created a wave of panic
            and skepticism against already flimsy trust in public health authority in the United States. Seemingly
            coming out of nowhere, it caught public health experts off guard, leaving the public confused.
          </Typography>
          <Typography className={classes.secondaryText}>
            Within days, the video went viral and attracted millions of views, as medical experts and the fact checking
            community lagged behind. In the early days of the video's virality, some people resorted to sharing informal
            fact-checks from experts on social media platforms such as Reddit and Twitter. This made clear the need for
            faster, democratized fact checking. A few days later, the Quærendo project was born.
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.smallSpacer} />
      <Button href='/claims' color='primary' className={classes.whiteText}>
        Start Investigating
      </Button>
      <div className={classes.spacer} />
    </Grid>
  )
}

export default LandingPage