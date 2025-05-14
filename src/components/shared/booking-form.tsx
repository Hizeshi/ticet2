'use client'
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingForm() {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-center text-xl font-semibold mb-6">Book seats for your show</h2>

            <Card className="mx-auto my-4 max-w-sm text-center">
                <CardContent className="py-6">
                    <p className="font-bold text-lg">Artist</p>
                    <p>Location</p>
                    <p>Start - End</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-6 mt-8">
                <Card>
                    <CardContent className="py-6 px-4">
                        <CardTitle className="text-lg mb-4 text-center">Selected seats</CardTitle>
                        <ul className="text-sm mb-4 text-center space-y-1">
                            <li>Row 2, Seat 13</li>
                            <li>Row 2, Seat 14</li>
                        </ul>
                        <p className="text-xs mb-4 text-center">Your seats expire in 02:35</p>
                        <div className="flex justify-center">
                            <Button variant="outline">← Change Seats</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-6 px-8 space-y-4">
                        <CardTitle className="mb-2 text-lg">Please enter your details</CardTitle>

                        <div>
                            <Label>Name</Label>
                            <Input placeholder="Your name" />
                        </div>

                        <div>
                            <Label>Address</Label>
                            <Input placeholder="Street, building" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ZIP Code</Label>
                                <Input />
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input />
                            </div>
                        </div>

                        <div>
                            <Label>Country</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kz">Kazakhstan</SelectItem>
                                    <SelectItem value="at">Austria</SelectItem>
                                    <SelectItem value="de">Germany</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="py-6 px-6 flex flex-col justify-between h-full">
                        <p className="text-sm text-muted-foreground mb-4">
                            By clicking "Book" you accept that you are not actually booking a ticket
                            as this is a test project and not a real website.
                        </p>

                        <div className="flex flex-col gap-2">
                            <div className="text-xs text-center border rounded-md py-2 px-4">
                                Your ticket will be available immediately after booking.
                            </div>
                            <Button className="w-full">Book</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}