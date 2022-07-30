import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import btc from '../images/btc.png';
import eth from '../images/eth.png';
import dash from '../images/dash.png';
import usa from '../images/usa.png'
import euro from '../images/euro.png'
import cad from '../images/cad.svg'
import inr from '../images/inr.png'
import pkr from '../images/pkr.png'
import logo from '../images/logo-white-hd.png'
import axios from '../Server'
import multiply from '../Config'

const multi_crypto_buy = multiply['Aed']['Crypto_buy']
const multi_crypto_sell = multiply['Aed']['Crypto_sell']

const multi_currency_buy = multiply['Aed']['Currency_buy']
const multi_currency_sell = multiply['Aed']['CUrrency_sell']

export default class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: true,
      images: [
        btc, eth, dash, usa, euro, cad, inr, pkr
      ],
      symbol: [
        'BTC', 'ETH', 'DASH', 'USD', 'EUR', 'CAD', 'INR', 'PKR'
      ],
      tiers: [
        {
          title: 'Buy',
          Title: 'WE BUY',
          Price: 'BUY RATE',
          subheader: 'bitstamp.com',
          price: '0',
          description: [
            0, 
            0, 
            0, 
            0,
            0,
            0,
            0,
            0
          ],
          buttonText: 'Sign up for free',
          buttonVariant: 'outlined',
        },
        {
          title: 'Sell',
          Title: 'WE SELL',
          Price: 'SELL RATE',
          subheader: 'bitfinex.com',
          price: '30',
          description: [
            0, 
            0, 
            0, 
            0,
            0,
            0,
            0,
            0
          ],
          buttonText: 'Contact us',
          buttonVariant: 'outlined',
        },
      ]
    }
  }
  componentDidMount() {
    document.title = "Coin Nerds Euro Rates"
    setInterval(() => {
      axios.get(`getconversion3`)
      .then(async (res) => {
        if (1) {
          this.setState({
            server: true
          })
          axios.get(`getbuy`)
          .then((bres) => {
            let buys = []
            for (let i = 0 ; i < bres.data.prices.length ; i += 1) {
              buys[i] = (bres.data.prices[i] * res.data.price1 * multi_crypto_buy[i]).toFixed(2)
            }
            buys.push((res.data.price1 * multi_currency_buy[0]).toFixed(4))
            buys.push((res.data.price2 * multi_currency_buy[1]).toFixed(4))
            buys.push((res.data.price3 * multi_currency_buy[2]).toFixed(4))
            buys.push((res.data.price4 * multi_currency_buy[3]).toFixed(4))
            buys.push((res.data.price5 * multi_currency_buy[4]).toFixed(4))
            let btiers = this.state.tiers
            btiers[0].description = buys
            this.setState({
              tiers: btiers
            })
          }).catch((error) => {})
          axios.get(`getsell`)
          .then((sres) => {
            let sells = []
            for (let i = 0 ; i < sres.data.prices.length ; i += 1) {
              sells[i] = (sres.data.prices[i] * res.data.price1 * multi_crypto_sell[i]).toFixed(2)
            }
            sells.push((res.data.price1 * multi_currency_sell[0]).toFixed(4))
            sells.push((res.data.price2 * multi_currency_sell[1]).toFixed(4))
            sells.push((res.data.price3 * multi_currency_sell[2]).toFixed(4))
            sells.push((res.data.price4 * multi_currency_sell[3]).toFixed(4))
            sells.push((res.data.price5 * multi_currency_sell[4]).toFixed(4))
            let stiers = this.state.tiers
            stiers[1].description = sells
            this.setState({
              tiers: stiers
            })
          }).catch((error) => {})
        } else {
          this.setState({
            server: false
          })
        }
      }).catch((error) => {
        this.setState({
          server: false
        })
      })
    }, 2 * 1000)
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={'heroContent'}>
          <div className="logo-container">
            {/* <div className="logo-image">COIN NERDS</div> */}
            <img src={logo} className="logo-image" alt="logo"></img>
          </div>
          {
            this.state.server === false
            ?
              <div className="down-server">Server is down or Xe.com Api limitation!</div>
            :
              <div></div>
          }
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main" className={"app-container"}>
          <Grid container spacing={10} alignItems="flex-end">
            {this.state.tiers.map(tier => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={6}>
                <Card>
                  <CardHeader
                    title={<div className="t-p-con"><div className="type">{tier.Title}</div><div className="price">{tier.Price}</div></div>}
                    // subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    // action={<StarIcon />}
                    className={`cardHeader ${tier.title}`}
                  />
                  <CardContent>
                    <ul>
                      {tier.description.map((line, index) => (
                        <div className="e-container" key={index}>
                          <Grid container spacing={5}>
                            <Grid item xs={6} sm={6} md={6}>
                              <div className={`e-image ${index}`}>
                                <img src={this.state.images[index]} alt="currency"/><span>1 {this.state.symbol[index]}</span>
                              </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className="e-item-con">
                              <div className="e-item">
                                {line === 0 ? '---':`${line} AED`}
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <div className="bottom-footer">
          * Rates Subject to terms and conditions<br/>Coin Nerds © 2020
        </div>
        {/* Footer */}
        {/* <Container maxWidth="md" component="footer" className={'footer'}>
          <Box mt={2}>
            <Copyright />
          </Box>
        </Container> */}
        {/* End footer */}
      </React.Fragment>
    );
  }
}