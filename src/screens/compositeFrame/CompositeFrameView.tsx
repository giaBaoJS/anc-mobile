import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const CompositeFrameView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>CompositeFrame Screen</Text>
        </Container>
    )
};

export default CompositeFrameView;

const styles = StyleSheet.create({});