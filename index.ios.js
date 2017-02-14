/**
 * Simple show case for possbile different auto-scrolling methods
 * First case is 'jumpy' method
 * By Arman Aydemir
 */
 'use strict';

import React, { Component } from 'react';
import {
  ScrollView,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// do i even need platform or switch???


class Auto_Scroll extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.state = {
      init_time: new Date().getTime(),
      offset: 0,
      end_time: null,
      _scrollEnabled: true,
      seconds: null,
      height: null
    };
  }
  handleScroll(event: Object) {
    this.setState({offset: event.nativeEvent.contentOffset.y});
  }
  onRelease(event: Object){
    if(this.state._scrollEnabled){
      var _end = new Date().getTime();
      this.setState({ _scrollEnabled: false, end_time: _end});

      var _offset = this.state.offset;
      var _height = this.state.height;
      var current = _offset;
      var _this = this;

      var interval = _end - this.state.init_time;
      var t = 0;

      var v = setInterval(function(){
        if(interval - t <= 5000){
          var w = (interval-t)/1000;
          w -= w%1;
          _this.setState({seconds: w+1});

          if(interval - t <= 0){
            current += _offset;
            _this.setState({seconds: ''});
            if(current < _height){
              _this._scrollView.scrollTo({y: current});
            }else{
              _this._scrollView.scrollToEnd();
              clearInterval(v);
            }
            t = 0;
          }
        }
        t += 100;
      }, 100);    
    }
  }
  render() {
    return (
    <View onLayout={(event) => {this.setState({height: event.nativeEvent.layout.height});}}>
      <ScrollView ref={(scrollView) => { this._scrollView = scrollView; }} onResponderRelease={this.onRelease} onScroll={this.handleScroll} scrollEnabled={this.state._scrollEnabled} scrollEventThrottle={16}>
       <View style={styles.container}>
          <TouchableHighlight style={styles.button} underlayColor='#013a1c'>
            <Text style={styles.buttonText}>Scroller</Text>
          </TouchableHighlight>
          <Text style={styles.content} word_count="75">At nine o’clock on the night of July 15th, General Hulusi Akar, the chief of the Turkish Army’s general staff, heard a knock on his office door in Ankara, the nation’s capital. It was one of his subordinates, General Mehmet Di&#351;li, and he was there to report that a military coup had begun. “We will get everybody,” Di&#351;li said. “Battalions and brigades are on their way. You will soon see.”
          </Text>
          <Text style={styles.content} word_count="11">Akar was aghast. “What the hell are you saying?” he asked.
          </Text>
          <Text style={styles.content} word_count="89">In other cities, officers involved in the coup had ordered their units to detain senior military leaders, block major roads, and seize crucial institutions like Istanbul Atatürk Airport. Two dozen F-16 fighters took to the air. According to statements from some of the officers involved, the plotters asked Akar to join them. When he refused, they handcuffed him and flew him by helicopter to an airbase where other generals were being held; at one point, one of the rebels pointed a gun at Akar and threatened to shoot.
          </Text>
          <Text style={styles.content} word_count="79">After midnight, a news anchor for Turkish Radio and Television was forced to read a statement by the plotters, who called themselves the Peace at Home Committee, a reference to one of the country’s founding ideals. Without mentioning the President, Recep Tayyip Erdo&#287;an, by name, the statement said that his government had destroyed the country’s institutions, engaged in corruption, supported terrorism, and ignored human rights: “The secular and democratic rule of law has been virtually eliminated.”
          </Text>
          <Text style={styles.content} word_count="59">For a time, the rebels seemed to have the upper hand. Provincial governors and community leaders surrendered or joined in, along with police squads. In a series of text messages discovered after the coup, a Major Murat Çelebio&#287;lu told his group, “The deputies of the Istanbul police chief have been called, informed, and the vast majority have complied.”
          </Text>
          <Text style={styles.content} word_count="13">A Colonel Uzan &#350;ahin replied, “Tell our police friends: I kiss their eyes.”
          </Text>
          <Text style={styles.content} word_count="105">But the plot seemed haphazard. A helicopter team sent to locate Erdo&#287;an in Marmaris, the resort town where he was vacationing, failed to capture the President, despite a shootout with guards at his hotel. The rebels took control of only one television station, and left cellular-phone networks untouched. Erdo&#287;an was able to record a video message, played on CNN Turk, in which he called on Turkish citizens to “take to the streets.” They did, in huge numbers. Faced with overwhelming popular resistance, the troops had to decide between shooting large groups of demonstrators and giving up. By morning, the uprising had been broken.
          </Text>
          <Text style={styles.content} word_count="90">Erdo&#287;an declared a national emergency and, in the weeks that followed, made a series of appearances to remind the nation of the cost of the coup. Some of the plotters had brutally shot demonstrators and comrades who opposed them. One rebel major, faced with resistance, had texted his soldiers, “Crush them, burn them, no compromise.” More than two hundred and sixty people were killed and thousands wounded. The F-16s had bombed the parliament building, blasting holes in the façade and scattering chunks of concrete in the hallways.
          </Text>
          <Text style={styles.content} word_count="73">In Erdo&#287;an’s telling, the coup was not a legitimate sign of civic unrest. In fact, it did not even originate in Turkey; the rebels “were being told what to do from Pennsylvania.” For Turks, the coded message was clear: Erdo&#287;an meant that the mastermind of the coup was Fethullah Gülen, a seventy-eight-year-old cleric, who had been living in exile for two decades in the Poconos, between Allentown and Scranton.
          </Text>
          <Text style={styles.content} word_count="115">Gülen, a dour, balding proselytizer with a scratchy voice, had fled Turkey in 1999, fearing arrest by the country’s military rulers. From afar, though, he had served as a spiritual guide for millions and overseen a worldwide network of charter schools, known for offering scholarships to the poor. Gülen’s sermons and writings emphasized reconciling Islam with contemporary science, and promoted charity; his movement is called Hizmet, or “service.” For many in the West, it represented a hopeful trend in Islam. Gülen met with Pope John Paul II and the leaders of major Jewish organizations, and was fêted by President Bill Clinton, who saluted his “ideas of tolerance and interfaith dialogue.”
          </Text>
        </View>
      </ScrollView>
      <Text style={styles.timer}> {this.state.seconds}
      </Text>
    </View>
    );
    
  }
}


const styles = StyleSheet.create({
  timer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor:'transparent'
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#036632',
    borderColor: '#036632',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('Auto_Scroll', () => Auto_Scroll);
