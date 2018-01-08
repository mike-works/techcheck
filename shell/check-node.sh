#!/bin/bash

######################
# Node.js version checking
# (c) 2018 Mike Works, Inc.

TECHCHECK_MIN_NODE_VERSION="4.5.0"

function log() {
    if [ ! -z ${DEBUG_SHELL+x } ];
    then
    echo $1
    fi
}

function normalize_version_string()
{
    local MAJ
    local MIN
    local PAT
    local SPE
    semverParseInto $2 MAJ MIN PAT SPE
    eval $1="$MAJ.$MIN.$PAT$SPE"
}

##################################
# Attempt to find the path of node, and assign# it to the provided variable
#################################
function get_node_path() {
    NODE_PATH=$(which node)
    if [ -z $NODE_PATH ]; then
        echo "[techcheck] ⛔️ ERROR: No node.js found on this system!"
        echo "               Go to https://nodejs.org and follow installation instructions"
        exit 1 # error
    fi
    log "[node_version] ℹ️ Node path found: $NODE_PATH"
    eval $1=$NODE_PATH
}

##################################
# Get the version of node.js, and assign# it to the provided variable
#################################
function get_raw_node_version() {
    local NODE_PATH
    get_node_path NODE_PATH
    local NODE_VERSION=$($NODE_PATH --version)
     if [ -z $NODE_VERSION ]; then
        echo "[techcheck] ⛔️ ERROR: Could not determine node.js version!"
        exit 1 # error
    fi
    log "[node_version] ℹ️ Node version found: $NODE_VERSION"
    eval $1=$NODE_VERSION
}

function get_node_version() {
    local RAW_VER;
    get_raw_node_version RAW_VER
    log "[node_version] ℹ️ Raw node version: $RAW_VER"
    local NORMALIZED_VER
    normalize_version_string NORMALIZED_VER $RAW_VER
    log "[node_version] ℹ️ Normalized node version: $NORMALIZED_VER"
    eval $1=$NORMALIZED_VER
}

#####
# Decompose a "raw" semver version string into parts
# source: https://github.com/cloudflare/semver_bash
function semverParseInto() {
    local RE='[^0-9]*\([0-9]*\)[.]\([0-9]*\)[.]\([0-9]*\)\([0-9A-Za-z-]*\)'
    #MAJOR
    eval $2=`echo $1 | sed -e "s#$RE#\1#"`
    #MINOR
    eval $3=`echo $1 | sed -e "s#$RE#\2#"`
    #MINOR
    eval $4=`echo $1 | sed -e "s#$RE#\3#"`
    #SPECIAL
    eval $5=`echo $1 | sed -e "s#$RE#\4#"`
}

#####
# check semver strings for equality
# source: https://github.com/cloudflare/semver_bash
function semverEQ() {
    local MAJOR_A=0
    local MINOR_A=0
    local PATCH_A=0
    local SPECIAL_A=0

    local MAJOR_B=0
    local MINOR_B=0
    local PATCH_B=0
    local SPECIAL_B=0

    semverParseInto $1 MAJOR_A MINOR_A PATCH_A SPECIAL_A
    semverParseInto $2 MAJOR_B MINOR_B PATCH_B SPECIAL_B

    if [ $MAJOR_A -ne $MAJOR_B ]; then
        return 1
    fi

    if [ $MINOR_A -ne $MINOR_B ]; then
        return 1
    fi

    if [ $PATCH_A -ne $PATCH_B ]; then
        return 1
    fi

    if [[ "_$SPECIAL_A" != "_$SPECIAL_B" ]]; then
        return 1
    fi


    return 0

}

#####
# compare two semver strings, to check whether A is less than B
# source: https://github.com/cloudflare/semver_bash
function semverLT() {
    local MAJOR_A=0
    local MINOR_A=0
    local PATCH_A=0
    local SPECIAL_A=0

    local MAJOR_B=0
    local MINOR_B=0
    local PATCH_B=0
    local SPECIAL_B=0

    semverParseInto $1 MAJOR_A MINOR_A PATCH_A SPECIAL_A
    semverParseInto $2 MAJOR_B MINOR_B PATCH_B SPECIAL_B

    if [ $MAJOR_A -lt $MAJOR_B ]; then
        return 0
    fi

    if [[ $MAJOR_A -le $MAJOR_B  && $MINOR_A -lt $MINOR_B ]]; then
        return 0
    fi
    
    if [[ $MAJOR_A -le $MAJOR_B  && $MINOR_A -le $MINOR_B && $PATCH_A -lt $PATCH_B ]]; then
        return 0
    fi

    if [[ "_$SPECIAL_A"  == "_" ]] && [[ "_$SPECIAL_B"  == "_" ]] ; then
        return 1
    fi
    if [[ "_$SPECIAL_A"  == "_" ]] && [[ "_$SPECIAL_B"  != "_" ]] ; then
        return 1
    fi
    if [[ "_$SPECIAL_A"  != "_" ]] && [[ "_$SPECIAL_B"  == "_" ]] ; then
        return 0
    fi

    if [[ "_$SPECIAL_A" < "_$SPECIAL_B" ]]; then
        return 0
    fi

    return 1

}

#####
# compare two semver strings, to check whether A is greater than B
# source: https://github.com/cloudflare/semver_bash
function semverGT() {
    semverEQ $1 $2
    local EQ=$?

    semverLT $1 $2
    local LT=$?

    if [ $EQ -ne 0 ] && [ $LT -ne 0 ]; then
        return 0
    else
        return 1
    fi
}

function assert_node_version() {
    local CURRENT_NODE_VERSION
    get_node_version CURRENT_NODE_VERSION
    semverGT $CURRENT_NODE_VERSION $TECHCHECK_MIN_NODE_VERSION
    local SEMVER_CHECK_RETURN_CODE=$?
    if [ "$SEMVER_CHECK_RETURN_CODE" -eq "1" ]; then
        echo "[node_version] ⛔️  ERROR: Node.js version $CURRENT_VERSION is too old. We can't even check the rest of your dependencies yet!"
        exit 1 #error
    elif [ "$SEMVER_CHECK_RETURN_CODE" -eq "0" ]; then 
        log "[node_version] ✅  Node.js v$CURRENT_NODE_VERSION found."
    fi
#     echo "$1 < $2 -> $?."
# echo "RESULT --> $NODE_VERSION" 
}

assert_node_version
