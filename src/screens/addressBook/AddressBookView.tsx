import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const AddressBookView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>AddressBook Screen</Text>
        </Container>
    )
};

export default AddressBookView;

const styles = StyleSheet.create({});