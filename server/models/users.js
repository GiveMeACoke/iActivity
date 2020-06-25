module.exports = (db, DataTypes) => {
    return db.define(
        'users',
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                field:'user_id',
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.UUIDV4,
                allowNull: false
            },
            solt: {
                type: DataTypes.UUIDV4,
                allowNull: false
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            organization_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            usable: {
                type: DataTypes.BOOLEAN,
                allowNull:false,
                defaultValue:true
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
}