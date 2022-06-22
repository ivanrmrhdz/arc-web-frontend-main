import store from '../store';

const getUserState = async () => new Promise((resolve, reject) => {
    if (store.state.user === undefined) {
        const unwatch = store.watch(
            () => store.state.user,
            (value) => {
                unwatch()
                resolve(value)
            }
        )
    } else {
        resolve(store.state.user)
    }
});


export const isAuthorized = async (to, from, next) => {

    const user = await getUserState();
    
    if (user) {
        if (to.path.includes('users') && user.role.name !== 'Administrador') {
            return next('/');
        }

        if (to.path.includes('login')) {
            return next('/report');
        }
    } else {
        if (to.path !== '/' && !to.path.includes('login')) {
            return next('/');
        }
        
    }


    next();
}

