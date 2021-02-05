import React, { Component, useEffect } from 'react';
import { Text, View, StyleSheet, Switch, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//import DatePicker from 'react-native-datepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';


class Reservation extends Component {
        constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date('2020-06-12T14:42:42'),
            mode: 'date',
            show: false,
            //    showModal: false
        }

    }


    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date('2020-06-12T14:42:42'),
            mode: 'date',
            show: false,
            //   showModal: false
        });
    }


    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }


    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to calendar');
            }
        }
        return permission;
    }

    async addReservationToCalendar() {
        
        await this.obtainCalendarPermission();
        
        let dateCurr = Date.parse(this.state.date);
        let endDate = new Date(dateCurr + 3600 * 2 * 1000);
        
        const defaultCalendarSource=Platform.OS==='ios'?await this.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
        
        const defaultCalendarId=await Calendar.createCalendarAsync({
            title: 'Your Reservation at Con Fusion',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source : defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        await Calendar.createEventAsync(defaultCalendarId, {
            title: 'Con Fusion Table Reservation',
            startDate: this.state.date,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking?: ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => { console.log('Cancel Pressed'); this.resetForm(); },
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date)
                        this.addReservationToCalendar(this.state.date);
                        console.log('OK Pressed'); this.resetForm();
                    }
                },
            ],
            { cancelable: true }
        );
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }


    render() {

        useEffect(() => {
            (async () => {
                const { status } = await Calendar.requestCalendarPermissionsAsync();
                if (status === 'granted') {
                    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                    console.log('Here are all your calendars:');
                    console.log({ calendars });
                }
            })();
        }, []);

        return (
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue) => this.setState({ guests: itemValue })}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({ smoking: value })}>
                    </Switch>
                </View>

                <View style={styles.formRow}>
                    {/* <Text style={styles.formLabel}>Date and Time</Text> */}

                    <Button onPress={this.datepicker} title="Show date picker!" />

                    {/* <DatePicker
                        style={{ flex: 2, marginRight: 20 }}
                        value={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minimumDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys. 
                        }}
                        onChange={(date) => { this.setState({ date: date }) }}
                    /> */}

                </View>
                <View style={styles.formRow}>
                    <Button onPress={this.timepicker} title="Show time picker!" />
                </View>


                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>

                {/* <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>

                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>
                */}
                { this.show && <RNDateTimePicker
                    value={this.state.date}
                    mode={this.state.mode}
                    is24Hour={true}
                    style={{ flex: 2, marginRight: 20 }}
                    display="default"
                    onChange={this.setDate}
                />
                }
            </Animatable.View>


        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});



export default Reservation;