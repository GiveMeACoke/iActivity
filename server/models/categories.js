module.exports = (db, DataTypes) => {
    return db.define(
        'categories',
        {
            category_id: {
                field:'category_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category_score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
}