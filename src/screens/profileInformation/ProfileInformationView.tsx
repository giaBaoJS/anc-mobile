import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const ProfileInformationView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>ProfileInformation Screen</Text>
        </Container>
    )
};

export default ProfileInformationView;

const styles = StyleSheet.create({});