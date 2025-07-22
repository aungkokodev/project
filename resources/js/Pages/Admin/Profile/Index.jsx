import Layout from "@/Layouts/Admin/Layout";
import {
    Person,
    Email,
    Phone,
    LocationOn,
    Lock,
    Security,
    History,
    BarChart,
    Notifications,
    Edit,
    CloudUpload,
    CheckCircle,
    Warning,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

const Index = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Admin User",
        email: "admin@farmsupply.com",
        phone: "+260 97 123 4567",
        location: "Lusaka, Zambia",
        role: "Super Administrator",
        joinDate: "January 15, 2022",
        lastLogin: "Today at 09:42 AM",
        avatar: "/path/to/avatar.jpg",
    });

    // Mock data
    const activityLogs = [
        {
            id: 1,
            action: "Logged in",
            time: "Today at 09:42 AM",
            ip: "192.168.1.1",
        },
        {
            id: 2,
            action: "Updated product #P-1002",
            time: "Yesterday at 03:15 PM",
            ip: "192.168.1.1",
        },
        {
            id: 3,
            action: "Processed 5 orders",
            time: "Yesterday at 11:30 AM",
            ip: "192.168.1.1",
        },
        {
            id: 4,
            action: "Added new category",
            time: "June 14, 2023",
            ip: "192.168.1.1",
        },
    ];

    const securityEvents = [
        {
            id: 1,
            event: "Password changed",
            time: "May 15, 2023",
            status: "success",
        },
        {
            id: 2,
            event: "Two-factor enabled",
            time: "March 22, 2023",
            status: "success",
        },
        {
            id: 3,
            event: "Failed login attempt",
            time: "February 5, 2023",
            status: "warning",
        },
    ];

    const stats = {
        productsAdded: 142,
        ordersProcessed: 856,
        customersRegistered: 324,
        tasksCompleted: 92,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setEditMode(false);
        // Here you would typically send the updated data to your backend
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Typography variant="h4" className="font-bold text-gray-800 mb-6">
                My Profile
            </Typography>

            <Grid container spacing={4}>
                {/* Left Column */}
                <Grid item xs={12} md={4}>
                    {/* Profile Card */}
                    <Card className="shadow-sm border border-gray-200 mb-4">
                        <CardContent className="flex flex-col items-center p-6">
                            <div className="relative mb-4">
                                <Avatar
                                    src={profileData.avatar}
                                    sx={{ width: 120, height: 120 }}
                                    className="border-2 border-white shadow-md"
                                />
                                {editMode && (
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600"
                                    >
                                        <CloudUpload fontSize="small" />
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            {editMode ? (
                                <>
                                    <TextField
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="h5"
                                        className="font-bold text-center"
                                    >
                                        {profileData.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        className="text-center mb-2"
                                    >
                                        {profileData.role}
                                    </Typography>
                                    <Chip
                                        label="Active"
                                        color="success"
                                        size="small"
                                        className="mb-4"
                                    />

                                    <List dense className="w-full">
                                        <ListItem>
                                            <ListItemIcon>
                                                <Email
                                                    fontSize="small"
                                                    className="text-gray-500"
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={profileData.email}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Phone
                                                    fontSize="small"
                                                    className="text-gray-500"
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={profileData.phone}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LocationOn
                                                    fontSize="small"
                                                    className="text-gray-500"
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={profileData.location}
                                            />
                                        </ListItem>
                                    </List>
                                </>
                            )}

                            <div className="flex gap-2 mt-4 w-full">
                                {editMode ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={handleSave}
                                            startIcon={<CheckCircle />}
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => setEditMode(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => setEditMode(true)}
                                        startIcon={<Edit />}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card className="shadow-sm border border-gray-200">
                        <CardHeader
                            title="Your Statistics"
                            avatar={<BarChart className="text-purple-500" />}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Paper className="p-3 text-center">
                                        <Typography
                                            variant="h6"
                                            className="font-bold"
                                        >
                                            {stats.productsAdded}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Products Added
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className="p-3 text-center">
                                        <Typography
                                            variant="h6"
                                            className="font-bold"
                                        >
                                            {stats.ordersProcessed}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Orders Processed
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className="p-3 text-center">
                                        <Typography
                                            variant="h6"
                                            className="font-bold"
                                        >
                                            {stats.customersRegistered}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Customers
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className="p-3 text-center">
                                        <Typography
                                            variant="h6"
                                            className="font-bold"
                                        >
                                            {stats.tasksCompleted}%
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Tasks Completed
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={stats.tasksCompleted}
                                            color="primary"
                                            className="mt-2"
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={8}>
                    <Card className="shadow-sm border border-gray-200">
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={activeTab}
                                onChange={(e, newValue) =>
                                    setActiveTab(newValue)
                                }
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab
                                    label="Activity Log"
                                    icon={<History fontSize="small" />}
                                    iconPosition="start"
                                />
                                <Tab
                                    label="Security"
                                    icon={<Security fontSize="small" />}
                                    iconPosition="start"
                                />
                                <Tab
                                    label="Notifications"
                                    icon={<Notifications fontSize="small" />}
                                    iconPosition="start"
                                />
                            </Tabs>
                        </Box>

                        <CardContent>
                            {activeTab === 0 && (
                                <div className="space-y-4">
                                    <Typography
                                        variant="h6"
                                        className="font-bold mb-4"
                                    >
                                        Recent Activity
                                    </Typography>
                                    {activityLogs.map((log) => (
                                        <div
                                            key={log.id}
                                            className="flex items-start p-3 hover:bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                                                <History
                                                    className="text-blue-500"
                                                    fontSize="small"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Typography
                                                    variant="body1"
                                                    className="font-medium"
                                                >
                                                    {log.action}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {log.time} • IP: {log.ip}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="text"
                                        color="primary"
                                        className="mt-2"
                                    >
                                        View Full Activity Log
                                    </Button>
                                </div>
                            )}

                            {activeTab === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <Typography
                                            variant="h6"
                                            className="font-bold mb-4"
                                        >
                                            Account Security
                                        </Typography>
                                        <div className="space-y-3">
                                            <Paper className="p-4 flex justify-between items-center">
                                                <div>
                                                    <Typography
                                                        variant="body1"
                                                        className="font-medium"
                                                    >
                                                        Password
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Last changed:{" "}
                                                        {securityEvents[0].time}
                                                    </Typography>
                                                </div>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Lock />}
                                                >
                                                    Change Password
                                                </Button>
                                            </Paper>

                                            <Paper className="p-4 flex justify-between items-center">
                                                <div>
                                                    <Typography
                                                        variant="body1"
                                                        className="font-medium"
                                                    >
                                                        Two-Factor
                                                        Authentication
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Add an extra layer of
                                                        security
                                                    </Typography>
                                                </div>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Security />}
                                                >
                                                    Enable 2FA
                                                </Button>
                                            </Paper>
                                        </div>
                                    </div>

                                    <Divider />

                                    <div>
                                        <Typography
                                            variant="h6"
                                            className="font-bold mb-4"
                                        >
                                            Security Events
                                        </Typography>
                                        <List dense>
                                            {securityEvents.map((event) => (
                                                <ListItem
                                                    key={event.id}
                                                    className="hover:bg-gray-50 rounded"
                                                >
                                                    <ListItemIcon>
                                                        {event.status ===
                                                        "success" ? (
                                                            <CheckCircle
                                                                className="text-green-500"
                                                                fontSize="small"
                                                            />
                                                        ) : (
                                                            <Warning
                                                                className="text-orange-500"
                                                                fontSize="small"
                                                            />
                                                        )}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={event.event}
                                                        secondary={event.time}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </div>
                            )}

                            {activeTab === 2 && (
                                <div>
                                    <Typography
                                        variant="h6"
                                        className="font-bold mb-4"
                                    >
                                        Notification Settings
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        className="mb-4"
                                    >
                                        Configure how you receive notifications
                                    </Typography>

                                    <div className="space-y-4">
                                        <Paper className="p-4">
                                            <Typography
                                                variant="body1"
                                                className="font-medium mb-2"
                                            >
                                                Email Notifications
                                            </Typography>
                                            <div className="flex justify-between">
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Order updates
                                                </Typography>
                                                <Chip
                                                    label="Enabled"
                                                    color="success"
                                                    size="small"
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Promotions
                                                </Typography>
                                                <Chip
                                                    label="Disabled"
                                                    color="default"
                                                    size="small"
                                                />
                                            </div>
                                        </Paper>

                                        <Paper className="p-4">
                                            <Typography
                                                variant="body1"
                                                className="font-medium mb-2"
                                            >
                                                System Alerts
                                            </Typography>
                                            <div className="flex justify-between">
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Security alerts
                                                </Typography>
                                                <Chip
                                                    label="Enabled"
                                                    color="success"
                                                    size="small"
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Low stock warnings
                                                </Typography>
                                                <Chip
                                                    label="Enabled"
                                                    color="success"
                                                    size="small"
                                                />
                                            </div>
                                        </Paper>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="mt-4"
                                        >
                                            Save Notification Preferences
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

Index.layout = (page) => <Layout children={page} />;

export default Index;
