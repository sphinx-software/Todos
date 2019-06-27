class Factory {

    make(data) {
        return data.map(item => ({...item, done : !!item.done}))
    }

    makeItem(item) {
        return {
            ...item,
            done : !!item.done
        }
    }
}

module.exports = Factory;