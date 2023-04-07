const cron = require('node-cron');

const axios = require('axios');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function runCronJob() {
    console.log('Running cron job');
    try {
        const classes = await prisma.class.findMany({
            include: {
                students: true,
                teacher: true,
            }
        });
        // console.log(classes)
        
        classes?.forEach((obj) => {
            const contentArray = obj.content.split(",");
            const randomIndex = Math.floor(Math.random() * contentArray.length);
            const randomWord = contentArray[randomIndex];
            console.log(randomWord);
            axios.post(`http://127.0.0.1:5000/api/model/getstory`, {
                keyWord: randomWord,
            })
            .then(async (res) => {
                console.log(res.data.key_story)
                await prisma.class.update({
                    where: {
                        id: obj.id
                    },
                    data: {
                        story: res.data.key_story,
                        random: randomWord
                    }
                })
            }).catch((err) => {
                console.log(err)
            })
        })
        // res.status(200).json({ classes });
    }
    catch (error) {
        console.log(error)
        // res.status(500).json({ message: "Internal Server Error" })
    }
}

// Schedule the function to run every 24 hours at midnight
cron.schedule('0 0 */1 * *', runCronJob);

// for 24hrs midnight -> 0 0 */1 * *
// for 5s -> */5 * * * * *